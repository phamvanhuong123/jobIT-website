export {};

declare global{
    interface IDataResponse<T>{
        status? :Number;
        message : String;
        data? : T;
    }
}