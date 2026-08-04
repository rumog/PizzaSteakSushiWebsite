export interface InferenceResponse {
  result: {
    class_name: string
    confidence: number
  }
}

export interface InferenceGetClassListResponse {
  result: {
    class_list: string[]
  }
}
