import {
    checkFilesExist,
    ensureNxProject,
    readJson,
    runNxCommandAsync,
    uniq,
} from '@nrwl/nx-plugin/testing';

describe('cdk-plugin e2e', () => {
    // Setting up individual workspaces per
    // test can cause e2e runs to take a long time.
    // For this reason, we recommend each suite only
    // consumes 1 workspace. The tests should each operate
    // on a unique project in the workspace, such that they
    // are not dependant on one another.
    beforeAll(() => {
        ensureNxProject('@iyio/nx-cdk', 'dist/packages/cdk-plugin');
    });

    afterAll(() => {
        // `nx reset` kills the daemon, and performs
        // some work which can help clean up e2e leftovers
        runNxCommandAsync('reset');
    });

    it('should create cdk-plugin', async () => {
        const project = uniq('cdk-plugin');
        await runNxCommandAsync(`generate @iyio/nx-cdk:cdk-plugin ${project}`);
        const result = await runNxCommandAsync(`build ${project}`);
        expect(result.stdout).toContain('Executor ran');
    }, 120000);

    describe('--directory', () => {
        it('should create src in the specified directory', async () => {
            const project = uniq('cdk-plugin');
            await runNxCommandAsync(
                `generate @iyio/nx-cdk:cdk-plugin ${project} --directory subdir`
            );
            expect(() =>
                checkFilesExist(`libs/subdir/${project}/src/index.ts`)
            ).not.toThrow();
        }, 120000);
    });

    describe('--tags', () => {
        it('should add tags to the project', async () => {
            const projectName = uniq('cdk-plugin');
            ensureNxProject('@iyio/nx-cdk', 'dist/packages/cdk-plugin');
            await runNxCommandAsync(
                `generate @iyio/nx-cdk:cdk-plugin ${projectName} --tags e2etag,e2ePackage`
            );
            const project = readJson(`libs/${projectName}/project.json`);
            expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
        }, 120000);
    });
});
