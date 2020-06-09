import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
var renderer = new marked.Renderer();
renderer.link = function (_href, _title, _text) {
    var link = marked.Renderer.prototype.link.apply(this, [
        _href,
        _title,
        _text
    ]);
    return link.replace('<a', '<a target="_blank" rel="noopener noreferrer"');
};
var markedOptions = {
    // Enable github flavored markdown
    gfm: true,
    breaks: true,
    headerIds: false,
    // Input text is sanitized using `sanitize-html` prior to being transformed by
    // `marked`
    sanitize: false,
    renderer: renderer
};
export var defaultSanitizerOptions = {
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
export var parseMarkdown = function (text, sanitizerOptions) {
    if (text === void 0) { text = ''; }
    if (sanitizerOptions === void 0) { sanitizerOptions = defaultSanitizerOptions; }
    var html = marked(text, markedOptions);
    var clean = sanitizeHtml(html, sanitizerOptions);
    return clean;
};
