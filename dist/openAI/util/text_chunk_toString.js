"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.text_chunk_toString = void 0;
function text_chunk_toString(text) {
    let final_text = "";
    text.map((item) => {
        final_text += item.pageContent.replace(/\n/g, ' ');
        final_text += '\n';
    });
    return final_text;
}
exports.text_chunk_toString = text_chunk_toString;
//# sourceMappingURL=text_chunk_toString.js.map