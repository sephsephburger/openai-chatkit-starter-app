import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Is this stock a value buy?",
    prompt:
      "Agent Warren, walk me through whether this stock is a good value investment. Include moat, management quality, debt, and fair value versus market price.",
    icon: "chart",
  },
  {
    label: "Evaluate a real estate deal",
    prompt:
      "Agent Warren, stress test this real estate opportunity. Consider cap rates, cash flow, leverage, location risks, and margin of safety.",
    icon: "map-pin",
  },
];

export const PLACEHOLDER_INPUT =
  "Ask Agent Warren about a stock, property, or crypto idea...";

export const GREETING =
  "I’m Agent Warren. Tell me about an investment you’re considering, and I’ll give you a Buffett-style take with current info.";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
