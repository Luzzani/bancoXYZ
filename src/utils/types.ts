export enum StorageErrorType {
  DEVICE_NOT_SECURE = 'DEVICE_NOT_SECURE',
  PERSISTENCE_FAILED = 'PERSISTENCE_FAILED',
  READ_FAILED = 'READ_FAILED',
  DELETE_FAILED = 'DELETE_FAILED',
}

export class StorageError extends Error {
  constructor(
    public type: StorageErrorType,
    message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = 'StorageError';
    Object.setPrototypeOf(this, StorageError.prototype);
  }
}
