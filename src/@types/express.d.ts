declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: {
        id: string;
        name: string;
        mail: string;
      };
    }
  }
  