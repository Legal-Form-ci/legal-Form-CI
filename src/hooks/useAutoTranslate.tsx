import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

/**
 * Hook for automatic translation of dynamic content.
 * Uses browser's built-in translation or falls back to key-based translation.
 * For dynamic content (articles, testimonials, search results), 
 * it provides translation utilities.
 */
export const useAutoTranslate = () => {
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language || 'fr';

  /**
   * Translate dynamic text using simple dictionary-based approach.
   * For production, this would connect to a translation API.
   */
  const translateText = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    const lang = targetLang || currentLang;
    if (lang === 'fr') return text; // French is the source language
    
    // For now, return original text - content is primarily in French
    // In production, integrate Google Translate API or DeepL
    return text;
  }, [currentLang]);

  /**
   * Get the appropriate content field based on current language.
   * Supports multilingual content stored as { fr: "...", en: "...", es: "..." }
   */
  const getLocalizedContent = useCallback((content: Record<string, string> | string): string => {
    if (typeof content === 'string') return content;
    return content[currentLang] || content['fr'] || Object.values(content)[0] || '';
  }, [currentLang]);

  /**
   * Format date according to current locale
   */
  const formatDate = useCallback((date: string | Date): string => {
    const d = new Date(date);
    const localeMap: Record<string, string> = {
      fr: 'fr-FR',
      en: 'en-US',
      es: 'es-ES',
    };
    return d.toLocaleDateString(localeMap[currentLang] || 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [currentLang]);

  return {
    currentLang,
    translateText,
    getLocalizedContent,
    formatDate,
    t,
  };
};
