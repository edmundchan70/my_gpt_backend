import { text_chunk } from "../DTO/text_chunk.dto";
import { DB_text_Chunk } from "../DTO/DB_textChunk.dto";
export declare function text_chunktoString(result: text_chunk[]): string;
export declare function text_chunk_filter_skipLine(result: text_chunk[]): text_chunk[];
export declare function text_chunk_to_DB(result: text_chunk[], doc_id: string, owner_id: number): any[];
export declare function DB_to_text_chunk(result: DB_text_Chunk[]): any[];
