import { startTransition, useEffect, useRef, useState } from "react";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import mainPhoto1 from "./assets/main-photo-1.png";
import mainPhoto2 from "./assets/main-photo-2.avif";
import mainPhoto3 from "./assets/main-photo-3.png";
import mainPhoto4 from "./assets/main-photo-4.avif";
import mainPhoto5 from "./assets/main-photo-5.png";
import { AmbientBackground } from "./components/AmbientBackground";
import { ContactsSection } from "./components/ContactsSection";
import { DateSection } from "./components/DateSection";
import { DetailsSection } from "./components/DetailsSection";
import { DressCodeSection } from "./components/DressCodeSection";
import { HeroMessageSection, HeroSection } from "./components/HeroSection";
import { ProgramSection } from "./components/ProgramSection";
import { RsvpSection } from "./components/RsvpSection";
import { VariantSwitcher } from "./components/VariantSwitcher";
import { VenueSection } from "./components/VenueSection";
import { WarmIntroGate } from "./components/WarmIntroGate";
import {
  FIREBASE_CONFIG,
  INITIAL_FORM_STATE,
  RSVP_COLLECTION_NAME,
  RSVP_CONTENT,
  WEDDING_DATE_ISO,
} from "./config/weddingData";
import { useFadeReveal } from "./hooks/useFadeReveal";
import { DEFAULT_VARIANT_KEY, WEDDING_VARIANTS, getWeddingVariant } from "./variants";
import { getCountdownState } from "./utils/dateUtils";
import { ensureVariantFontsLoaded, preloadAllVariantFonts } from "./utils/fontUtils";
import {
  getVariantKeyFromLocation,
  syncDocumentBackground,
  syncVariantInLocation,
  updateMeta,
} from "./utils/variantUtils";

const WEDDING_DATE = new Date(WEDDING_DATE_ISO);
const WARM_INTRO_VARIANT_KEY = "warm";

const HERO_PHOTOS_BY_VARIANT = {
  classic: mainPhoto1,
  warm: mainPhoto2,
  modern: mainPhoto3,
  minimal: mainPhoto4,
  scenic: mainPhoto5,
};

const firebaseApp = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
const db = getFirestore(firebaseApp);

function resolveVariantKey(variantKey) {
  return getWeddingVariant(variantKey).key;
}

function App() {
  const initialVariantKeyRef = useRef(
    getVariantKeyFromLocation(resolveVariantKey, DEFAULT_VARIANT_KEY),
  );
  const [activeVariantKey, setActiveVariantKey] = useState(
    initialVariantKeyRef.current,
  );
  const [isInitialFontsReady, setIsInitialFontsReady] = useState(false);
  const [countdown, setCountdown] = useState(() => getCountdownState(WEDDING_DATE));
  const [heroPhotoReady, setHeroPhotoReady] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWarmIntroDismissed, setIsWarmIntroDismissed] = useState(
    () => initialVariantKeyRef.current !== WARM_INTRO_VARIANT_KEY,
  );
  const [isWarmIntroOpening, setIsWarmIntroOpening] = useState(false);
  const warmIntroTimeoutRef = useRef(null);
  const rsvpSectionRef = useRef(null);

  const activeVariant = getWeddingVariant(activeVariantKey);
  const activeHeroPhoto = HERO_PHOTOS_BY_VARIANT[activeVariant.key] ?? mainPhoto1;
  const shouldHideHeroPhoto =
    activeVariant.key === "minimal" || activeVariant.key === "scenic";
  const isWarmIntroVisible =
    activeVariant.key === WARM_INTRO_VARIANT_KEY && !isWarmIntroDismissed;
  const warmIntroClassName = isWarmIntroVisible
    ? isWarmIntroOpening
      ? " warm-intro-opening"
      : " warm-intro-active"
    : "";
  const pageShellClassName = `page-shell theme-${activeVariant.scene}${warmIntroClassName}`;

  useFadeReveal(activeVariant.key);

  useEffect(() => {
    let cancelled = false;

    const preloadInitialFonts = async () => {
      preloadAllVariantFonts();
      await ensureVariantFontsLoaded(initialVariantKeyRef.current);

      if (!cancelled) {
        setIsInitialFontsReady(true);
      }
    };

    void preloadInitialFonts();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (warmIntroTimeoutRef.current) {
        clearTimeout(warmIntroTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
      warmIntroTimeoutRef.current = null;
    }

    if (activeVariant.key === WARM_INTRO_VARIANT_KEY) {
      setIsWarmIntroDismissed(false);
      setIsWarmIntroOpening(false);
      return;
    }

    setIsWarmIntroDismissed(true);
    setIsWarmIntroOpening(false);
  }, [activeVariant.key]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    if (isWarmIntroVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isWarmIntroVisible]);

  useEffect(() => {
    if (typeof window === "undefined" || shouldHideHeroPhoto) {
      setHeroPhotoReady(false);
      return undefined;
    }

    let cancelled = false;
    setHeroPhotoReady(false);

    const image = new window.Image();
    const handleReady = () => {
      if (!cancelled) {
        setHeroPhotoReady(true);
      }
    };

    image.onload = handleReady;
    image.onerror = handleReady;
    image.src = activeHeroPhoto;

    if (image.complete) {
      handleReady();
    }

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [activeHeroPhoto, shouldHideHeroPhoto]);

  useEffect(() => {
    const updateCountdownState = () => {
      setCountdown(getCountdownState(WEDDING_DATE));
    };

    updateCountdownState();
    const timer = setInterval(updateCountdownState, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (submitStatus !== "success" || !rsvpSectionRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      rsvpSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [submitStatus]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopstate = () => {
      const nextVariantKey = getVariantKeyFromLocation(
        resolveVariantKey,
        DEFAULT_VARIANT_KEY,
      );

      const syncVariantFromLocation = async () => {
        await ensureVariantFontsLoaded(nextVariantKey);
        setActiveVariantKey(nextVariantKey);
      };

      void syncVariantFromLocation();
    };

    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  useEffect(() => {
    syncVariantInLocation(activeVariant.key);
    updateMeta(activeVariant);
    syncDocumentBackground(activeVariant);
  }, [activeVariant]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rootElement = document.documentElement;
    const bodyElement = document.body;
    const previousRootScrollBehavior = rootElement.style.scrollBehavior;
    const previousBodyScrollBehavior = bodyElement.style.scrollBehavior;

    rootElement.style.scrollBehavior = "auto";
    bodyElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      rootElement.style.scrollBehavior = previousRootScrollBehavior;
      bodyElement.style.scrollBehavior = previousBodyScrollBehavior;
    });
  }, [activeVariant.key]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => {
      if (name === "withGuest" && value === RSVP_CONTENT.options.no) {
        return { ...prev, withGuest: value, guestName: "" };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleAlcoholToggle = (event) => {
    const { value, checked } = event.target;

    setFormData((prev) => {
      const nextAlcohol = checked
        ? [...prev.alcohol, value]
        : prev.alcohol.filter((item) => item !== value);

      return {
        ...prev,
        alcohol: nextAlcohol,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("idle");
    setSubmitError("");

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.willCome ||
      !formData.withGuest
    ) {
      setSubmitStatus("error");
      setSubmitError(RSVP_CONTENT.requiredError);
      return;
    }

    if (
      formData.withGuest === RSVP_CONTENT.options.yes &&
      !formData.guestName.trim()
    ) {
      setSubmitStatus("error");
      setSubmitError(RSVP_CONTENT.guestNameError);
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, RSVP_COLLECTION_NAME), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        willCome: formData.willCome,
        withGuest: formData.withGuest,
        guestName:
          formData.withGuest === RSVP_CONTENT.options.yes
            ? formData.guestName.trim()
            : "",
        alcohol: formData.alcohol,
        alcoholOther: formData.alcoholOther.trim(),
        submittedAt: serverTimestamp(),
      });

      setSubmitStatus("success");
      setFormData(INITIAL_FORM_STATE);
    } catch {
      setSubmitStatus("error");
      setSubmitError(RSVP_CONTENT.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeWarmIntro = () => {
    setIsWarmIntroDismissed(true);
    setIsWarmIntroOpening(false);

    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
      warmIntroTimeoutRef.current = null;
    }
  };

  const handleWarmInvitationOpen = () => {
    if (isWarmIntroOpening) {
      return;
    }

    setIsWarmIntroOpening(true);

    if (warmIntroTimeoutRef.current) {
      clearTimeout(warmIntroTimeoutRef.current);
    }

    warmIntroTimeoutRef.current = setTimeout(() => {
      completeWarmIntro();
    }, 2400);
  };

  const handleWarmIntroAnimationEnd = (event) => {
    if (!isWarmIntroOpening) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.animationName !== "warm-gate-fade") {
      return;
    }

    completeWarmIntro();
  };

  const handleVariantChange = (variantKey) => {
    if (variantKey === activeVariant.key) {
      return;
    }

    const switchVariant = async () => {
      await ensureVariantFontsLoaded(variantKey);

      startTransition(() => {
        setActiveVariantKey(variantKey);
      });
    };

    void switchVariant();
  };

  const fontPreloadProbe = (
    <div className="font-preload" aria-hidden="true">
      <span style={{ fontFamily: '"Cormorant Garamond", serif' }}>Wedding</span>
      <span style={{ fontFamily: '"Great Vibes", cursive' }}>Wedding</span>
      <span style={{ fontFamily: '"Amatic SC", cursive' }}>Wedding</span>
      <span style={{ fontFamily: '"Caveat", cursive' }}>Wedding</span>
      <span style={{ fontFamily: '"Forum", serif' }}>Wedding</span>
      <span style={{ fontFamily: '"Inter", sans-serif' }}>Wedding</span>
    </div>
  );

  if (!isInitialFontsReady) {
    return (
      <div className={pageShellClassName} style={activeVariant.theme}>
        {fontPreloadProbe}
      </div>
    );
  }

  return (
    <div className={pageShellClassName} style={activeVariant.theme}>
      {fontPreloadProbe}
      <AmbientBackground />

      <WarmIntroGate
        isVisible={isWarmIntroVisible}
        isOpening={isWarmIntroOpening}
        onOpen={handleWarmInvitationOpen}
        onAnimationEnd={handleWarmIntroAnimationEnd}
      />

      <div className="page-content">
        <HeroSection
          subtitle={activeVariant.hero.subtitle}
          activeHeroPhoto={activeHeroPhoto}
          heroPhotoReady={heroPhotoReady}
          shouldHideHeroPhoto={shouldHideHeroPhoto}
          onHeroPhotoLoad={() => setHeroPhotoReady(true)}
        />

        <HeroMessageSection
          appeal={activeVariant.hero.appeal}
          note={activeVariant.hero.note}
        />

        <DateSection
          variantKey={activeVariant.key}
          countdown={countdown}
          weddingDate={WEDDING_DATE}
        />

        <ProgramSection />
        <VenueSection venueDescription={activeVariant.venueDescription} />
        <DetailsSection details={activeVariant.details} />
        <DressCodeSection variantKey={activeVariant.key} />

        <RsvpSection
          rsvpSectionRef={rsvpSectionRef}
          rsvpIntro={activeVariant.rsvpIntro}
          formData={formData}
          submitStatus={submitStatus}
          submitError={submitError}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onAlcoholToggle={handleAlcoholToggle}
          onResetSubmitStatus={() => setSubmitStatus("idle")}
        />

        <ContactsSection
          contactsNote={activeVariant.contactsNote}
          footerText={activeVariant.footer}
        />
      </div>

      <VariantSwitcher
        variants={WEDDING_VARIANTS}
        activeVariantKey={activeVariant.key}
        onVariantChange={handleVariantChange}
      />
    </div>
  );
}

export default App;
