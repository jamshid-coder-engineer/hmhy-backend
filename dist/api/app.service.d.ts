export declare class Application {
    private readonly API_PREFIX;
    private readonly SWAGGER_PATH;
    private readonly CORS_METHODS;
    private readonly LOG_LEVELS;
    start(): Promise<void>;
    private setupCors;
    private setupGlobalPrefix;
    private setupMiddlewares;
    private setupInterceptors;
    private setupFilters;
    private setupPipes;
    private createValidationPipe;
    private validationExceptionFactory;
    private setupSwagger;
    private startServer;
}
