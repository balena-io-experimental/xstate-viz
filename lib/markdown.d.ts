import sanitizeHtml from 'sanitize-html';
export declare const defaultSanitizerOptions: {
    allowedTags: string[];
    allowedAttributes: {
        a: string[];
        img: string[];
        input: (string | {
            name: string;
            multiple: boolean;
            values: string[];
        })[];
        span: string[];
        div: string[];
        aside: string[];
        article: string[];
        header: string[];
    };
};
export declare const parseMarkdown: (text?: string, sanitizerOptions?: sanitizeHtml.IOptions) => string;
