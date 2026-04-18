<<<<<<< HEAD
export type TtsProvider = string;
=======
export type TtsProvider = "elevenlabs" | "openai" | "edge" | "cli";
>>>>>>> de00295238bc77575123842f3972c48e65e0aeef

export type TtsMode = "final" | "all";

export type TtsAutoMode = "off" | "always" | "inbound" | "tagged";

export type TtsModelOverrideConfig = {
  /** Enable model-provided overrides for TTS. */
  enabled?: boolean;
  /** Allow model-provided TTS text blocks. */
  allowText?: boolean;
  /** Allow model-provided provider override (default: false). */
  allowProvider?: boolean;
  /** Allow model-provided voice/voiceId override. */
  allowVoice?: boolean;
  /** Allow model-provided modelId override. */
  allowModelId?: boolean;
  /** Allow model-provided voice settings override. */
  allowVoiceSettings?: boolean;
  /** Allow model-provided normalization or language overrides. */
  allowNormalization?: boolean;
  /** Allow model-provided seed override. */
  allowSeed?: boolean;
};

export type TtsProviderConfigMap = Record<string, Record<string, unknown>>;

export type TtsConfig = {
  /** Auto-TTS mode (preferred). */
  auto?: TtsAutoMode;
  /** Legacy: enable auto-TTS when `auto` is not set. */
  enabled?: boolean;
  /** Apply TTS to final replies only or to all replies (tool/block/final). */
  mode?: TtsMode;
  /** Primary TTS provider (fallbacks are automatic). */
  provider?: TtsProvider;
  /** Optional model override for TTS auto-summary (provider/model or alias). */
  summaryModel?: string;
  /** Allow the model to override TTS parameters. */
  modelOverrides?: TtsModelOverrideConfig;
<<<<<<< HEAD
  /** Provider-specific TTS settings keyed by speech provider id. */
  providers?: TtsProviderConfigMap;
=======
  /** ElevenLabs configuration. */
  elevenlabs?: {
    apiKey?: string;
    baseUrl?: string;
    voiceId?: string;
    modelId?: string;
    seed?: number;
    applyTextNormalization?: "auto" | "on" | "off";
    languageCode?: string;
    voiceSettings?: {
      stability?: number;
      similarityBoost?: number;
      style?: number;
      useSpeakerBoost?: boolean;
      speed?: number;
    };
  };
  /** OpenAI configuration. */
  openai?: {
    apiKey?: string;
    model?: string;
    voice?: string;
  };
  /** Microsoft Edge (node-edge-tts) configuration. */
  edge?: {
    /** Explicitly allow Edge TTS usage (no API key required). */
    enabled?: boolean;
    voice?: string;
    lang?: string;
    outputFormat?: string;
    pitch?: string;
    rate?: string;
    volume?: string;
    saveSubtitles?: boolean;
    proxy?: string;
    timeoutMs?: number;
  };
  /** CLI-based TTS configuration (runs any CLI TTS tool). */
  cli?: {
    /** CLI executable path or name. */
    command: string;
    /** Arguments with placeholders: {{text}}, {{output}}, {{voice}}. */
    args?: string[];
    /** Output format (wav, mp3, opus). */
    outputFormat?: string;
    /** Voice/voice reference for the CLI tool. */
    voice?: string;
    /** Timeout in ms. */
    timeoutMs?: number;
  };
>>>>>>> de00295238bc77575123842f3972c48e65e0aeef
  /** Optional path for local TTS user preferences JSON. */
  prefsPath?: string;
  /** Hard cap for text sent to TTS (chars). */
  maxTextLength?: number;
  /** API request timeout (ms). */
  timeoutMs?: number;
};
