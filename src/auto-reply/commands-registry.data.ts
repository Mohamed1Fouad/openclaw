import { listLoadedChannelPlugins } from "../channels/plugins/registry-loaded.js";
import { getActivePluginChannelRegistryVersionFromState } from "../plugins/runtime-channel-state.js";
import {
  assertCommandRegistry,
  buildBuiltinChatCommands,
  defineChatCommand,
} from "./commands-registry.shared.js";
import type { ChatCommandDefinition } from "./commands-registry.types.js";

type ChannelPlugin = ReturnType<typeof listLoadedChannelPlugins>[number];

function supportsNativeCommands(plugin: ChannelPlugin): boolean {
  return plugin.capabilities?.nativeCommands === true;
}

function defineDockCommand(plugin: ChannelPlugin): ChatCommandDefinition {
  return defineChatCommand({
    key: `dock:${plugin.id}`,
    nativeName: `dock_${plugin.id}`,
    description: `Switch to ${plugin.id} for replies.`,
    textAliases: [`/dock-${plugin.id}`, `/dock_${plugin.id}`],
    category: "docks",
  });
}

let cachedCommands: ChatCommandDefinition[] | null = null;
let cachedRegistryVersion = -1;
let cachedNativeCommandSurfaces: Set<string> | null = null;
let cachedNativeRegistryVersion = -1;

function buildChatCommands(): ChatCommandDefinition[] {
  const commands: ChatCommandDefinition[] = [
<<<<<<< HEAD
    ...buildBuiltinChatCommands(),
    ...listLoadedChannelPlugins()
      .filter(supportsNativeCommands)
      .map((plugin) => defineDockCommand(plugin)),
=======
    defineChatCommand({
      key: "help",
      nativeName: "help",
      description: "Show available commands.",
      textAlias: "/help",
      category: "status",
    }),
    defineChatCommand({
      key: "commands",
      nativeName: "commands",
      description: "List all slash commands.",
      textAlias: "/commands",
      category: "status",
    }),
    defineChatCommand({
      key: "skill",
      nativeName: "skill",
      description: "Run a skill by name.",
      textAlias: "/skill",
      category: "tools",
      args: [
        {
          name: "name",
          description: "Skill name",
          type: "string",
          required: true,
        },
        {
          name: "input",
          description: "Skill input",
          type: "string",
          captureRemaining: true,
        },
      ],
    }),
    defineChatCommand({
      key: "status",
      nativeName: "status",
      description: "Show current status.",
      textAlias: "/status",
      category: "status",
    }),
    defineChatCommand({
      key: "allowlist",
      description: "List/add/remove allowlist entries.",
      textAlias: "/allowlist",
      acceptsArgs: true,
      scope: "text",
      category: "management",
    }),
    defineChatCommand({
      key: "approve",
      nativeName: "approve",
      description: "Approve or deny exec requests.",
      textAlias: "/approve",
      acceptsArgs: true,
      category: "management",
    }),
    defineChatCommand({
      key: "context",
      nativeName: "context",
      description: "Explain how context is built and used.",
      textAlias: "/context",
      acceptsArgs: true,
      category: "status",
    }),
    defineChatCommand({
      key: "tts",
      nativeName: "tts",
      description: "Control text-to-speech (TTS).",
      textAlias: "/tts",
      category: "media",
      args: [
        {
          name: "action",
          description: "TTS action",
          type: "string",
          choices: [
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
            { value: "status", label: "Status" },
            { value: "provider", label: "Provider" },
            { value: "limit", label: "Limit" },
            { value: "summary", label: "Summary" },
            { value: "audio", label: "Audio" },
            { value: "help", label: "Help" },
          ],
        },
        {
          name: "value",
          description: "Provider, limit, or text",
          type: "string",
          captureRemaining: true,
        },
      ],
      argsMenu: {
        arg: "action",
        title:
          "TTS Actions:\n" +
          "• On – Enable TTS for responses\n" +
          "• Off – Disable TTS\n" +
          "• Status – Show current settings\n" +
          "• Provider – Set voice provider (edge, elevenlabs, openai, cli)\n" +
          "• Limit – Set max characters for TTS\n" +
          "• Summary – Toggle AI summary for long texts\n" +
          "• Audio – Generate TTS from custom text\n" +
          "• Help – Show usage guide",
      },
    }),
    defineChatCommand({
      key: "whoami",
      nativeName: "whoami",
      description: "Show your sender id.",
      textAlias: "/whoami",
      category: "status",
    }),
    defineChatCommand({
      key: "subagents",
      nativeName: "subagents",
      description: "List/stop/log/info subagent runs for this session.",
      textAlias: "/subagents",
      category: "management",
      args: [
        {
          name: "action",
          description: "list | stop | log | info | send",
          type: "string",
          choices: ["list", "stop", "log", "info", "send"],
        },
        {
          name: "target",
          description: "Run id, index, or session key",
          type: "string",
        },
        {
          name: "value",
          description: "Additional input (limit/message)",
          type: "string",
          captureRemaining: true,
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "config",
      nativeName: "config",
      description: "Show or set config values.",
      textAlias: "/config",
      category: "management",
      args: [
        {
          name: "action",
          description: "show | get | set | unset",
          type: "string",
          choices: ["show", "get", "set", "unset"],
        },
        {
          name: "path",
          description: "Config path",
          type: "string",
        },
        {
          name: "value",
          description: "Value for set",
          type: "string",
          captureRemaining: true,
        },
      ],
      argsParsing: "none",
      formatArgs: COMMAND_ARG_FORMATTERS.config,
    }),
    defineChatCommand({
      key: "debug",
      nativeName: "debug",
      description: "Set runtime debug overrides.",
      textAlias: "/debug",
      category: "management",
      args: [
        {
          name: "action",
          description: "show | reset | set | unset",
          type: "string",
          choices: ["show", "reset", "set", "unset"],
        },
        {
          name: "path",
          description: "Debug path",
          type: "string",
        },
        {
          name: "value",
          description: "Value for set",
          type: "string",
          captureRemaining: true,
        },
      ],
      argsParsing: "none",
      formatArgs: COMMAND_ARG_FORMATTERS.debug,
    }),
    defineChatCommand({
      key: "usage",
      nativeName: "usage",
      description: "Usage footer or cost summary.",
      textAlias: "/usage",
      category: "options",
      args: [
        {
          name: "mode",
          description: "off, tokens, full, or cost",
          type: "string",
          choices: ["off", "tokens", "full", "cost"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "stop",
      nativeName: "stop",
      description: "Stop the current run.",
      textAlias: "/stop",
      category: "session",
    }),
    defineChatCommand({
      key: "restart",
      nativeName: "restart",
      description: "Restart OpenClaw.",
      textAlias: "/restart",
      category: "tools",
    }),
    defineChatCommand({
      key: "activation",
      nativeName: "activation",
      description: "Set group activation mode.",
      textAlias: "/activation",
      category: "management",
      args: [
        {
          name: "mode",
          description: "mention or always",
          type: "string",
          choices: ["mention", "always"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "send",
      nativeName: "send",
      description: "Set send policy.",
      textAlias: "/send",
      category: "management",
      args: [
        {
          name: "mode",
          description: "on, off, or inherit",
          type: "string",
          choices: ["on", "off", "inherit"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "reset",
      nativeName: "reset",
      description: "Reset the current session.",
      textAlias: "/reset",
      acceptsArgs: true,
      category: "session",
    }),
    defineChatCommand({
      key: "new",
      nativeName: "new",
      description: "Start a new session.",
      textAlias: "/new",
      acceptsArgs: true,
      category: "session",
    }),
    defineChatCommand({
      key: "compact",
      description: "Compact the session context.",
      textAlias: "/compact",
      scope: "text",
      category: "session",
      args: [
        {
          name: "instructions",
          description: "Extra compaction instructions",
          type: "string",
          captureRemaining: true,
        },
      ],
    }),
    defineChatCommand({
      key: "think",
      nativeName: "think",
      description: "Set thinking level.",
      textAlias: "/think",
      category: "options",
      args: [
        {
          name: "level",
          description: "off, minimal, low, medium, high, xhigh",
          type: "string",
          choices: ({ provider, model }) => listThinkingLevels(provider, model),
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "verbose",
      nativeName: "verbose",
      description: "Toggle verbose mode.",
      textAlias: "/verbose",
      category: "options",
      args: [
        {
          name: "mode",
          description: "on or off",
          type: "string",
          choices: ["on", "off"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "reasoning",
      nativeName: "reasoning",
      description: "Toggle reasoning visibility.",
      textAlias: "/reasoning",
      category: "options",
      args: [
        {
          name: "mode",
          description: "on, off, or stream",
          type: "string",
          choices: ["on", "off", "stream"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "elevated",
      nativeName: "elevated",
      description: "Toggle elevated mode.",
      textAlias: "/elevated",
      category: "options",
      args: [
        {
          name: "mode",
          description: "on, off, ask, or full",
          type: "string",
          choices: ["on", "off", "ask", "full"],
        },
      ],
      argsMenu: "auto",
    }),
    defineChatCommand({
      key: "exec",
      nativeName: "exec",
      description: "Set exec defaults for this session.",
      textAlias: "/exec",
      category: "options",
      args: [
        {
          name: "options",
          description: "host=... security=... ask=... node=...",
          type: "string",
        },
      ],
      argsParsing: "none",
    }),
    defineChatCommand({
      key: "model",
      nativeName: "model",
      description: "Show or set the model.",
      textAlias: "/model",
      category: "options",
      args: [
        {
          name: "model",
          description: "Model id (provider/model or id)",
          type: "string",
        },
      ],
    }),
    defineChatCommand({
      key: "models",
      nativeName: "models",
      description: "List model providers or provider models.",
      textAlias: "/models",
      argsParsing: "none",
      acceptsArgs: true,
      category: "options",
    }),
    defineChatCommand({
      key: "queue",
      nativeName: "queue",
      description: "Adjust queue settings.",
      textAlias: "/queue",
      category: "options",
      args: [
        {
          name: "mode",
          description: "queue mode",
          type: "string",
          choices: ["steer", "interrupt", "followup", "collect", "steer-backlog"],
        },
        {
          name: "debounce",
          description: "debounce duration (e.g. 500ms, 2s)",
          type: "string",
        },
        {
          name: "cap",
          description: "queue cap",
          type: "number",
        },
        {
          name: "drop",
          description: "drop policy",
          type: "string",
          choices: ["old", "new", "summarize"],
        },
      ],
      argsParsing: "none",
      formatArgs: COMMAND_ARG_FORMATTERS.queue,
    }),
    defineChatCommand({
      key: "bash",
      description: "Run host shell commands (host-only).",
      textAlias: "/bash",
      scope: "text",
      category: "tools",
      args: [
        {
          name: "command",
          description: "Shell command",
          type: "string",
          captureRemaining: true,
        },
      ],
    }),
    ...listChannelDocks()
      .filter((dock) => dock.capabilities.nativeCommands)
      .map((dock) => defineDockCommand(dock)),
>>>>>>> de00295238bc77575123842f3972c48e65e0aeef
  ];

  assertCommandRegistry(commands);
  return commands;
}

export function getChatCommands(): ChatCommandDefinition[] {
  const registryVersion = getActivePluginChannelRegistryVersionFromState();
  if (cachedCommands && registryVersion === cachedRegistryVersion) {
    return cachedCommands;
  }
  const commands = buildChatCommands();
  cachedCommands = commands;
  cachedRegistryVersion = registryVersion;
  cachedNativeCommandSurfaces = null;
  return commands;
}

export function getNativeCommandSurfaces(): Set<string> {
  const registryVersion = getActivePluginChannelRegistryVersionFromState();
  if (cachedNativeCommandSurfaces && registryVersion === cachedNativeRegistryVersion) {
    return cachedNativeCommandSurfaces;
  }
  cachedNativeCommandSurfaces = new Set(
    listLoadedChannelPlugins()
      .filter(supportsNativeCommands)
      .map((plugin) => plugin.id),
  );
  cachedNativeRegistryVersion = registryVersion;
  return cachedNativeCommandSurfaces;
}
