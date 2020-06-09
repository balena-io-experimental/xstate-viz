import marked from 'marked';
import sanitizeHtml from 'sanitize-html';

const renderer = new marked.Renderer();

renderer.link = function (_href, _title, _text) {
  const link = marked.Renderer.prototype.link.apply(this, [
    _href,
    _title,
    _text
  ]);
  return link.replace('<a', '<a target="_blank" rel="noopener noreferrer"');
};

const markedOptions = {
  // Enable github flavored markdown
  gfm: true,
  breaks: true,
  headerIds: false,
  // Input text is sanitized using `sanitize-html` prior to being transformed by
  // `marked`
  sanitize: false,
  renderer
};

export const defaultSanitizerOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'article',
    'aside',
    'del',
    'div',
    'h1',
    'h2',
    'header',
    'img',
    'input',
    'span'
  ]),
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'class', 'title', 'alt'],
    input: [
      {
        name: 'type',
        multiple: false,
        values: ['checkbox']
      },
      'disabled',
      'checked'
    ],
    span: ['class'],
    div: ['class'],
    aside: ['class'],
    article: ['class'],
    header: ['class']
  }
};

export const parseMarkdown = (
  text: string = '',
  sanitizerOptions: sanitizeHtml.IOptions = defaultSanitizerOptions
) => {
  const html = marked(text, markedOptions);
  const clean = sanitizeHtml(html, sanitizerOptions as any);
  return clean;
};
