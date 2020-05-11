import React, {CSSProperties, memo, useEffect, useState} from "react";
import * as styles from "./currency-rate-widget.scss";

import downRateImage from "./images/icons8-down-50.png";
import upRateImage from "./images/icons8-up-50.png";

import {ICurrencyRateWidget, ICurrencyRateWidgetData} from "../../models";
import {ICurrencyRateService} from "../../services";

export interface ICurrencyRateWidgetProps {
    widget: ICurrencyRateWidget,
    currencyRateService: ICurrencyRateService
}

function CurrencyRateWidgetComponent(props: ICurrencyRateWidgetProps) {
    const {widget, currencyRateService} = props;
    const [currencyRateData, setCurrencyRateData] = useState<ICurrencyRateWidgetData>(null);
    useEffect(() => {
        currencyRateService
            .getCurrencyRate(widget)
            .then(setCurrencyRateData)
    }, []);
    const [downRate1Opacity, setDownRate1Opacity] = useState<CSSProperties>({});
    const [downRate2Opacity, setDownRate2Opacity] = useState<CSSProperties>({});
    const setCurrencyRateUp = (currencyRateNumber: 1 | 2) => {
        if(currencyRateNumber === 1) {
            setDownRate1Opacity({opacity: 0});
        } else if (currencyRateNumber === 2) {
            setDownRate2Opacity({opacity: 0});
        }

    };
    const setCurrencyRateDown = (currencyRateNumber: 1 | 2) => {
        if(currencyRateNumber === 1) {
            setDownRate1Opacity({opacity: 1});
        } else if (currencyRateNumber === 2) {
            setDownRate2Opacity({opacity: 1});
        }
    };


    useEffect(() => {
        setTimeout(() => {
            setCurrencyRateUp(1);
        }, 3000);
        setTimeout(() => {
            setCurrencyRateDown(2);
        }, 3000);
    }, []);
    return <article className={styles.currencyRateWidget}>
        {currencyRateData &&
            <>
                <div>
                    <div className={styles.currencyWrapper}>
                        <img className={styles.currencyImage} src={currencyRateData.currency1.imageUrl} alt="EUR" width={22} height={13}/>
                        <span className={styles.currencyName} dangerouslySetInnerHTML={{__html: currencyRateData.currency1.displayName}}/>
                    </div>
                    <div className={styles.currencyRateWrapper}>
                        <div className={styles.rateImagesWrapper}>
                            <img className={styles.rateChangeImage} src={upRateImage} width={22} height={22} alt="up-rate"/>
                            <img className={styles.rateChangeImageBottom} src={downRateImage} width={22} height={22} alt="down-rate" style={downRate1Opacity}/>
                        </div>
                        <span className={styles.rateValue}>{currencyRateData.rate1}</span>
                    </div>
                </div>
                <div>
                    <div className={styles.currencyWrapper}>
                        <img className={styles.currencyImage} src={currencyRateData.currency2.imageUrl} alt="EUR" width={22} height={13}/>
                        <span className={styles.currencyName} dangerouslySetInnerHTML={{__html: currencyRateData.currency2.displayName}}/>
                    </div>
                    <div className={styles.currencyRateWrapper}>
                        <div className={styles.rateImagesWrapper}>
                            <img className={styles.rateChangeImage} src={upRateImage} width={22} height={22} alt="up-rate"/>
                            <img className={styles.rateChangeImageBottom} src={downRateImage} width={22} height={22} alt="down-rate" style={downRate2Opacity}/>
                        </div>
                        <span className={styles.rateValue}>{currencyRateData.rate2}</span>
                    </div>
                </div>
            </>
        }
    </article>
}

export const CurrencyRateWidget = memo(CurrencyRateWidgetComponent);