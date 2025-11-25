# Agents Overview
- This app is a minimal ChatKit shell: it does **not** host an agent locally. All behavior comes from an OpenAI-hosted workflow you build and publish in Agent Builder.
- The UI and API simply pass a workflow ID to ChatKit, fetch a client secret, and render the `<openai-chatkit>` widget with a couple of client-side tools exposed to the agent.

## Configure Your Agent
- Create or publish a workflow in Agent Builder and copy its ID (`wf_...`).
- Set env vars in `.env.local` (or your deploy env):
  - `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`: the workflow ID ChatKit should connect to.
  - `OPENAI_API_KEY`: must belong to the same org/project as the workflow; used server-side when creating sessions.
  - `CHATKIT_API_BASE` (optional): override the default `https://api.openai.com` base.
- Restart the dev server after changing env vars so the client picks up the new workflow ID.

## Session Flow (app/api/create-session/route.ts)
- The client calls `POST /api/create-session` to create a ChatKit session.
- The route resolves a workflow ID in this order: request body `workflow.id` → `workflowId` → `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`.
- It POSTs to ChatKit `/v1/chatkit/sessions` with the resolved workflow ID, a generated/sticky `user` id (cookie), and `chatkit_configuration.file_upload.enabled: true`.
- On success it returns `client_secret` + `expires_after` to the client; errors are surfaced back to the UI.

## Client Tools Exposed to the Agent (components/ChatKitPanel.tsx)
- `switch_theme`: params `{ theme: "light" | "dark" }`; flips the UI color scheme.
- `record_fact`: params `{ fact_id: string, fact_text: string }`; deduplicates by `fact_id` and calls `onWidgetAction` (currently just logs in dev).
- Any other tool name returns `{ success: false }`. Define matching client tools in your Agent Builder workflow if you want the agent to call these.

## UI Defaults (lib/config.ts)
- Greeting: `How can I help you today?`
- Placeholder: `Ask anything...`
- Starter prompt: “What can you do?”
- Theme palette is derived from `getThemeConfig`; feel free to tweak.

## What to Change for Your Own Agent
- Point to a different workflow: update `NEXT_PUBLIC_CHATKIT_WORKFLOW_ID`.
- Add/remove client tools: extend `onClientTool` in `ChatKitPanel.tsx` and add the same tool definitions in your Agent Builder workflow.
- Adjust the start screen, prompts, greeting, or theming in `lib/config.ts`.
