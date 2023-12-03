// forked from chabudai's "ホネホネ・クロック JS - forked from: Human Clock" http://jsdo.it/chabudai/4K7S
/**
 *  FireFoxのみちゃんとしたスピードで表示されます。
 *  
 *  Flash版はこちら
 *  http://wonderfl.net/c/3gx1
 */

// https://gist.github.com/tutsnut/4044172


// Edited By Ritban Barua ( https://github.com/RitbanBarua )


import React, { useEffect } from 'react'

export default function Clock() {

    function _updateView(h1, h2, m1, m2, s1, s2) {
        var _url = "http://www.chabudai.org/temp/wonderfl/honehone/img/";
        document.getElementById('hour1').style.backgroundImage = "url(" + _url + "h" + h1 + ".gif)";
        document.getElementById('hour2').style.backgroundImage = "url(" + _url + "hh" + h2 + ".gif)";
        document.getElementById('minute1').style.backgroundImage = "url(" + _url + "m" + m1 + ".gif)";
        document.getElementById('minute2').style.backgroundImage = "url(" + _url + "mm" + m2 + ".gif)";
        document.getElementById('second1').style.backgroundImage = "url(" + _url + "s" + s1 + ".gif)";
        document.getElementById('second2').style.backgroundImage = "url(" + _url + "ss" + s2 + ".gif)";
    }
    

    const updateView = () => {
        var now = new Date();
        var second = now.getSeconds();
        var minute = now.getMinutes();
        var hour = now.getHours();

        // １つずつにする
        var hour1 = hour < 10 ? 0 : Math.floor(hour / 10);
        var hour2 = hour % 10;

        var minute1 = minute < 10 ? 0 : Math.floor(minute / 10);
        var minute2 = minute % 10;

        var second1 = second < 10 ? 0 : Math.floor(second / 10);
        var second2 = second % 10;

        _updateView(hour1, hour2, minute1, minute2, second1, second2);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateView();
        }, 500);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            <div id="canvas">
                <div id="hour1"></div>
                <div id="hour2"></div>
                <div id="minute1"></div>
                <div id="minute2"></div>
                <div id="second1"></div>
                <div id="second2"></div>
            </div>
        </>
    )
}
