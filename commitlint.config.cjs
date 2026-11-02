/**
 * The estate's single conventional-commit policy.
 *
 * Owned here, in CR1MS0N-Operator/.github, and consumed by the reusable workflow
 * .github/workflows/commitlint.yml. Repositories carry a six-line caller and no
 * local copy — a local config would silently override this one.
 *
 * Why the three explicit rules:
 *   header-max-length    kept at 100: titles are changelog material, and 100 is satisfiable.
 *   body-max-line-length disabled: prose wraps in git; enforcing a column produced red
 *                                  builds for zero readability gain.
 *   footer-max-line-length disabled: footers carry trailers (Refs:, Co-Authored-By:), not prose.
 *
 * Merge commits are ignored because GitHub generates them, not the operator.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => /^Merge (pull request|branch|remote-tracking)/.test(message)],
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
