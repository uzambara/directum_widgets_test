import{widgetUtils} from "../widget.utils";

describe("widget utils tests getNewRowIndexAfterDragStop. Колонка не изменилась.", () => {
    it.each([
        //expectedRowIndex, currentRowIndex, changedWidgetTop
        [0, 0, 0],
        [0, 0, 20],
        [1, 0, 35],
        [2, 0, 45],

        [0, 1, 0],
        [1, 1, 20],
        [1, 1, 35],
        [2, 1, 45],

        [0, 2, 0],
        [1, 2, 20],
        [2, 2, 35],
        [2, 2, 45],

    ])(`вставляет элемент на позицию %i, если текущая позиция равна %i, а отступ равен %i`, (
            expectedRowIndex,
            currentRowIndex,
            changedWidgetTop) => {
        // Arrange
        const currentColumnIndex = 1;
        const newColumnIdx = 1;
        let currentColumnElementRef: any = {
            current: {
                children: [
                    {getBoundingClientRect: () => ({top: 10})},
                    {getBoundingClientRect: () => ({top: 30})},
                    {getBoundingClientRect: () => ({top: 40})}
                ]
            }
        };

        // Act
        const result = widgetUtils.getNewRowIndexAfterDragStop({
            currentColumnElementRef,
            currentRowIndex,
            currentColumnIndex,
            newColumnIdx,
            changedWidgetTop});

        // Asserts
        expect(result).toEqual(expectedRowIndex);
    });
});

describe("widget utils tests getNewRowIndexAfterDragStop. Колонка изменилась.", () => {
    it.each([
        //expectedRowIndex, currentRowIndex, changedWidgetTop
        [0, 0, 0],
        [1, 1, 20],
        [2, 2, 35],
        [3, 3, 45]
    ])(`вставляет элемент на позицию %i, если текущая позиция равна %i, а отступ равен %i`, (
        // Arrange
        currentRowIndex,
        expectedRowIndex,
        changedWidgetTop) => {
        const currentColumnIndex = 1;
        const newColumnIdx = 2;
        let currentColumnElementRef: any = {
            current: {
                children: [
                    {getBoundingClientRect: () => ({top: 10})},
                    {getBoundingClientRect: () => ({top: 30})},
                    {getBoundingClientRect: () => ({top: 40})}
                ]
            }
        };

        // Act
        const result = widgetUtils.getNewRowIndexAfterDragStop({
            currentColumnElementRef,
            currentRowIndex,
            currentColumnIndex,
            newColumnIdx,
            changedWidgetTop});

        // Asserts
        expect(result).toEqual(expectedRowIndex);
    });
});
