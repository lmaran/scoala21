import { EntityModule } from './entity.module';

describe('EntitiesModule', () => {
    let entityModule: EntityModule;

    beforeEach(() => {
        entityModule = new EntityModule();
    });

    it('should create an instance', () => {
        expect(entityModule).toBeTruthy();
    });
});
