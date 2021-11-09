export interface IGrantStrategy {
  run(data: any): Promise<any>;
}
