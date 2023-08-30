import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { text_chunk } from "../DTO/text_chunk.dto";
import { TensorFlowEmbeddings } from "langchain/embeddings/tensorflow";
import * as tf from '@tensorflow/tfjs-node'
import { DB_text_Chunk } from "../DTO/DB_textChunk.dto";
 
export function text_chunktoString(result:text_chunk[]) :string{
  let new_text = "";
  for (let i = 0; i < result.length; i++) {
    const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
    new_text += pageContent;
  }
  return new_text
}
export function text_chunk_filter_skipLine(result:text_chunk[]) : text_chunk[]{
  let new_text : text_chunk[] = [];
  for (let i = 0; i < result.length; i++) {
    const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
    new_text.push({
      pageContent:pageContent,
      metadata: result[i].metadata
    })
  }
  return new_text
}
export function text_chunk_to_DB(result:text_chunk[],doc_id:string, owner_id:number) {
  let text_chunk_db_obj = [];
  for (let i = 0; i < result.length; i++) {
    const pageContent = result[i].pageContent.replace(/\n/g, " ").trim();
     text_chunk_db_obj.push({
      doc_id: doc_id,
      owner_id: owner_id,
      text_chunk: pageContent
     })
  }
  return text_chunk_db_obj;
}
export function DB_to_text_chunk(result: DB_text_Chunk[]){
    let text_chunk =[]
    for (let i = 0; i < result.length; i++) {
        text_chunk.push({
          metdadata: '',
          pageContent: result[0].text_chunk
        })
    return text_chunk
    }
}
 