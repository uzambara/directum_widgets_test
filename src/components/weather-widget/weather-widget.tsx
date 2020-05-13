import React, {memo, useCallback, useEffect, useState} from "react";
import * as styles from "./weather-widget.scss";
import {IWeatherWidget, IWeatherWidgetData, IWidget} from "../../models";
import cn from "classnames";
import {WidgetContextMenu} from "../index";
import {IWeatherService} from "../../services";

export interface IWeatherWidgetProps {
    widget: IWeatherWidget,
    weatherService: IWeatherService,
    onDeleteWidget: (widget: IWidget) => void,
    onEditWidget: (widget: IWidget) => void
}

function WeatherWidgetComponent(props: IWeatherWidgetProps) {
    const {widget, weatherService, onDeleteWidget, onEditWidget} = props;
    const [widgetData, setWidgetData] = useState<IWeatherWidgetData>(widget.initialData);
    const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState(null);
    const deleteSelf = () => onDeleteWidget(widget);
    const editSelf = () => onEditWidget(widget);

    const openContextMenu = useCallback((ev) => {
        setContextMenuAnchorEl(ev.currentTarget);
    }, []);
    const closeContextMenu = useCallback(() => {
        setContextMenuAnchorEl(null);
    }, []);
    useEffect(() => {
        // У API есть ограничение по вызовам в сутки. Что бы не упереться в потолок это можно юзать при разработке.
        // if(!widget.initialData) {
        //     weatherService
        //         .getWeather(widget)
        //         .then(result => {
        //             widget.initialData = result;
        //             setWidgetData(result);
        //         });
        // }
        weatherService
            .getWeather(widget)
            .then(result => {
                widget.initialData = result;
                setWidgetData(result);

            });

    }, []);

    return <article className={cn(styles.weatherWidget)} id="handle">
        <WidgetContextMenu
            onClose={closeContextMenu}
            anchorEl={contextMenuAnchorEl}
            onDeleteClick={deleteSelf}
            onEditClick={editSelf}
        />
        <ul className={styles.contextMenuButton} onClick={openContextMenu}>
            <li className={styles.contextMenuButtonCircle}/>
            <li className={styles.contextMenuButtonCircle}/>
            <li className={styles.contextMenuButtonCircle}/>
        </ul>
        {widgetData &&
            <>
                <h3 className={styles.cityName}>{widgetData.cityName}</h3>
                <span className={cn(styles.weatherInfo, styles.localTime)}>Now {widgetData.currentTime}</span>
                <span className={cn(styles.weatherInfo, styles.weatherWidgetDayOfWeek)}>{widgetData.currentDate}</span>
                <img className={styles.weatherImg} alt="weather" src={widgetData.weatherIconUrl}/>
                <span className={cn(styles.weatherInfo, styles.currentTemp)} dangerouslySetInnerHTML={{__html: widgetData.temperature}}/>
                <span className={cn(styles.weatherInfo, styles.tempFeelsLikeWrapper)}>
                    Feels like&nbsp;
                    <span className={cn(styles.weatherInfo, styles.tempFeelsLike)} dangerouslySetInnerHTML={{__html: widgetData.temperatureFeelsLike}}/>
                </span>
                <ul className={cn(styles.indicatorsList)}>
                    <li className={styles.indicatorItem}><span className={styles.windImage}/><span>{widgetData.speedOfWind}</span></li>
                    <li className={styles.indicatorItem}><span className={styles.humidityImage}/><span>{widgetData.humidity}</span></li>
                    <li className={cn(styles.indicatorItem, styles.indicatorItemPressure)}><span className={styles.pressureImage}/><span>{widgetData.pressure}</span></li>
                </ul>
            </>
        }
    </article>
}
export const WeatherWidget = memo(WeatherWidgetComponent);