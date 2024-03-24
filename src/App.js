import React, { useState } from 'react';
import { marked } from 'marked';
import './App.css';

const MarkdownPreviewer = () => {
  const [markdownInput, setMarkdownInput] = useState('# Hello, World!');
  const [renderedHTML, setRenderedHTML] = useState('');
  const [theme, setTheme] = useState('light');

  const handleMarkdownInput = (event) => {
    const inputValue = event.target.value;
    setMarkdownInput(inputValue);

    // Render Markdown to HTML
    const htmlOutput = marked(inputValue);
    setRenderedHTML(htmlOutput);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const insertMarkdown = (syntax) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newText = before + syntax + after;
    setMarkdownInput(newText);
    textarea.focus();
  };

  return (
    <div className={`markdown-previewer ${theme}`}>
      <div className="toolbar">
        <button onClick={() => insertMarkdown('**Bold**')} title="Bold"><b>B</b></button>
        <button onClick={() => insertMarkdown('*Italic*')} title="Italic"><i>I</i></button>
        <button onClick={() => insertMarkdown('### Heading')} title="Heading"><code>H</code></button>
        <button onClick={() => insertMarkdown('[Link](https://example.com)')} title="Link"><span>&#128279;</span></button>
        <button onClick={() => insertMarkdown('```\ncode\n```')} title="Code Block"><code>`</code></button>
        <button onClick={() => insertMarkdown('![Image](https://example.com/image.jpg)')} title="Image"><span>&#128247;</span></button>
        <button onClick={() => insertMarkdown('- Item 1\n- Item 2')} title="Unordered List"><span>&#9711;</span></button>
        <button onClick={toggleTheme} title="Toggle Theme">{theme === 'light' ? '🌙' : '☀️'}</button>
      </div>
      <div className="editor-preview">
        <div className="editor">
          <textarea
            value={markdownInput}
            onChange={handleMarkdownInput}
            placeholder="Enter your Markdown text here..."
          />
        </div>
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
      </div>
      <footer className="copyright">
        <p>&copy; {new Date().getFullYear()} Umesh GJH. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MarkdownPreviewer;
