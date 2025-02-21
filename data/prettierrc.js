module.exports = {
    // Basic Settings
    semi: true, // Use semicolons (true by default)
    trailingComma: 'es5', // Trailing commas where valid in ES5 (objects, arrays, etc.)
    singleQuote: true, // Use single quotes instead of double quotes
    printWidth: 80, // Line length (80 characters by default)
    tabWidth: 2, // Number of spaces per indentation level (2 by default)
    useTabs: false, // Use spaces instead of tabs (false by default)
    bracketSpacing: true, // Add spaces between brackets in object literals (true by default)

    // Language-Specific Overrides (Optional)
    overrides: [
        {
            files: '*.json', // Example: Customize JSON formatting
            options: {
                tabWidth: 4, // Example: 4-space indentation for JSON
            },
        },
        // Add more overrides as needed
    ],

    // Other Options (Less Common)
    arrowParens: 'always', // Include parentheses around a sole arrow function parameter.
    bracketSameLine: false, // Put the `>` of a multi-line JSX element at the end of the last line instead of being alone on the next.
    endOfLine: 'lf', // Line ending sequence (lf, crlf, auto)
    htmlWhitespaceSensitivity: 'css', // How to handle whitespace in HTML.
    jsxBracketSameLine: false, // Same as bracketSameLine but specifically for JSX.
    jsxSingleQuote: false, // Use single quotes in JSX.
    quoteProps: 'as-needed', // Only use quotes around object keys when necessary.
    requirePragma: false, // Require a special comment at the top of files to signal that Prettier should format them.
    rangeStart: 0, // Format code starting at a given character position.
    rangeEnd: Infinity, // Format code ending at a given character position.
    insertPragma: false, // Insert a special comment at the top of files to signal that Prettier should format them.
    proseWrap: 'preserve', // How to wrap prose (markdown, text, etc.).
    singleAttributePerLine: false, // Put each attribute on its own line in HTML elements.
    vueIndentScriptAndStyle: false, // Whether or not to indent the code inside <script> and <style> tags in Vue files.
    embeddedLanguageFormatting: 'auto', // Control whether Prettier should format embedded languages.
};