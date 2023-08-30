"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_to_text_chunk = exports.text_chunk_to_DB = exports.text_chunk_filter_skipLine = exports.text_chunktoString = void 0;
function text_chunktoString(result) {
    let new_text = "";
    for (let i = 0; i < result.length; i++) {
        const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
        new_text += pageContent;
    }
    return new_text;
}
exports.text_chunktoString = text_chunktoString;
function text_chunk_filter_skipLine(result) {
    let new_text = [];
    for (let i = 0; i < result.length; i++) {
        const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
        new_text.push({
            pageContent: pageContent,
            metadata: result[i].metadata
        });
    }
    return new_text;
}
exports.text_chunk_filter_skipLine = text_chunk_filter_skipLine;
function text_chunk_to_DB(result, doc_id, owner_id) {
    let text_chunk_db_obj = [];
    for (let i = 0; i < result.length; i++) {
        const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
        text_chunk_db_obj.push({
            doc_id: doc_id,
            owner_id: owner_id,
            text_chunk: pageContent
        });
    }
    return text_chunk_db_obj;
}
exports.text_chunk_to_DB = text_chunk_to_DB;
function DB_to_text_chunk(result) {
    let text_chunk = [];
    for (let i = 0; i < result.length; i++) {
        text_chunk.push({
            metdadata: '',
            pageContent: result[0].text_chunk
        });
        return text_chunk;
    }
}
exports.DB_to_text_chunk = DB_to_text_chunk;
//# sourceMappingURL=HNSWLib.js.map