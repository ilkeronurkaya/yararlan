<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CI/CD and Agent Workflow Rules

- **Autocommit & Push:** When completing a coding task, you MUST automatically commit the changes and push them to the GitHub repository. Do not wait for the user to explicitly ask for a `git push`.
- Formulate clear, concise, and descriptive commit messages (e.g. `feat: ...`, `fix: ...`, `chore: ...`).
- Run build/compilation checks before committing to ensure the application builds successfully.
