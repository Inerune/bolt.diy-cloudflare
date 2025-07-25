import { z } from "zod";

export const mcpClient = {
  connected: true,

  getRegisteredTools() {
    return [
      {
        type: "function",
        function: {
          name: "get_component",
          description: "Fetches a component by name.",
          parameters: z.object({
            name: z.string().describe("The component name to fetch"),
          }),
        },
      },
      {
        type: "function",
        function: {
          name: "get_component_demo",
          description: "Returns a demo version of a component.",
          parameters: z.object({
            name: z.string().describe("Component name"),
          }),
        },
      },
      {
        type: "function",
        function: {
          name: "list_components",
          description: "Lists all available components.",
          parameters: z.object({}),
        },
      },
      {
        type: "function",
        function: {
          name: "get_component_metadata",
          description: "Retrieves metadata about a component.",
          parameters: z.object({
            name: z.string().describe("Component name"),
          }),
        },
      },
      {
        type: "function",
        function: {
          name: "get_directory_structure",
          description: "Returns the directory structure of components or blocks.",
          parameters: z.object({
            path: z.string().describe("Path to directory (can be empty for root)"),
          }),
        },
      },
      {
        type: "function",
        function: {
          name: "get_block",
          description: "Fetches a block by name.",
          parameters: z.object({
            name: z.string().describe("The block name to fetch"),
          }),
        },
      },
      {
        type: "function",
        function: {
          name: "list_blocks",
          description: "Lists all available blocks.",
          parameters: z.object({}),
        },
      },
    ];
  },

  async callTool(toolCall: {
    name: string;
    arguments?: { [key: string]: unknown };
    _meta?: { progressToken?: string | number };
  }) {
    console.log("🚀 MCP Tool Invoked:", toolCall.name, toolCall.arguments);
    const res = await fetch("http://localhost:3001/mcp/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolName: toolCall.name,
        input: toolCall.arguments ?? {},
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Tool call failed: ${error}`);
    }

    const { result } = await res.json();
    return result;
  },
};
