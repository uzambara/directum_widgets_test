import React, {useCallback, useEffect, useState} from "react";
import * as styles from './main.page.scss';
import {WidgetsController, WidgetsTable} from "../components";
import {ICity, IWidget} from "../models";
import {CitiesService, WidgetService} from "../services";
import {widgetUtils} from "../utils";
import {WidgetsControllerDialog} from "../components/widgets-controller-dialog/widgets-controller-dialog";
import {useTigerValue} from "../hooks/useTrigerValue";

export interface IMainPageProps {
    columnsCount: number
}

export function MainPage(props: IMainPageProps) {
    const {columnsCount} = props;
    const [cities, setCities] = useState<ICity[]>([]);
    const [widgets, setWidgets] = useState<{[colIndex: number]: IWidget[]}>(() => widgetUtils.initWidgetsByColumnMap(columnsCount));
    const {setOn: onEditWidget, setOff: onCloseEdit, value: editedWidget} = useTigerValue(null);

    useEffect(() => {
        CitiesService
            .getCities()
            .then(setCities);

        const widgets = WidgetService.getWidgets();
        setWidgets(widgets);
    }, []);

    const onDeleteWidget = useCallback((widget: IWidget) => {
        const newWidgets = widgetUtils.deleteWidget(widget, widgets);

        WidgetService.saveWidgets(newWidgets);
        setWidgets(newWidgets);
    }, [widgets]);

    const onChangeWidget = useCallback((widget: IWidget) => {
        const newWidgets = widgetUtils.changeWidget(widget, editedWidget, widgets);

        WidgetService.saveWidgets(newWidgets);
        setWidgets(newWidgets);
        onCloseEdit();
    }, [widgets, editedWidget]);

    const onWidgetAdd = useCallback((widget: IWidget) => {
        const newWidgets = widgetUtils.addWidget(widget, widgets);

        WidgetService.saveWidgets(newWidgets);
        setWidgets(newWidgets);
    }, [widgets]);

    const onWidgetPositionChanged = useCallback((
        id: string,
        oldColumnIndex: number,
        newColumnIndex: number,
        currentRowIndex: number,
        newRowIndex: number) => {
        const newWidgetsByColumn = widgetUtils.changeWidgetPlace(id, oldColumnIndex, newColumnIndex, newRowIndex, widgets);
        setWidgets(newWidgetsByColumn);
    }, [widgets]);

    return <main className={styles.mainPageContainer}>
        <WidgetsControllerDialog
            initialWidget={editedWidget}
            columnsCount={columnsCount}
            onSubmit={onChangeWidget}
            cities={cities}
            isOpen={editedWidget != null}
            submitButtonText="Confirm"
            onCancel={onCloseEdit}
        />
        <h1 className={styles.mainPageHeader}>Widgets</h1>
        <WidgetsController
            columnsCount={columnsCount}
            onSubmit={onWidgetAdd}
            cities={cities}
            className={styles.widgetsController}
        />
        <WidgetsTable
            onEditWidget={onEditWidget}
            columnsCount={columnsCount}
            widgets={widgets}
            onDeleteWidget={onDeleteWidget}
            onWidgetPositionChange={onWidgetPositionChanged}
        />
    </main>
}