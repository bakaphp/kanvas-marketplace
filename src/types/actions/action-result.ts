type SusccessResult<Data> = {
  success: true;
  data: Data;
};

type FailedResult = {
  success: false;
  message: string;
};

export type ActionResult<Data = undefined> =
  | SusccessResult<Data>
  | FailedResult;
