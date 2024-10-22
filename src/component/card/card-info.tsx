import React, { CSSProperties, ReactNode } from 'react';
import './card-info.css';

interface CardData {
    Name: string,
    Image: string,
    Subtitle: string,
    DateCreated: string,
    Content: string,
    style?: CSSProperties,
    className?: string,
    direction?: "col" | "row" // row or column,
    mediaType?: "contain" | "cover" | "hug"

}

export function CardInfo({ Name, Subtitle, Image, Content, className = '', style, direction }: CardData) {
    return <div className={`card-media-position ${className.split(' ').filter(e => e !== 'row' && e !== 'col').join(' ')} ${direction}`} style={style}>
        <div className="media-preview-card" >
            {Image ??
                <img className="media-preview-child" src={Image ?? "https://via.placeholder.com/40x40"} />
            }
        </div>
        <div className="des-info">
            <div className="content-title">
                <div className="content-title-parent">
                    <div className="content-title-text"> {Name ?? 'Lorem Ipsum is simply dummy text'}</div>
                    <div className="content-subtitle-text">{Subtitle ?? 'Subtitle'}</div>
                </div>
                <div className="body-content">{Content ?? 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'}</div>
            </div>
            <div className="sub-content-list">
                {Array.from({ length: 3 }).map((e, i) => <div className="item-sub-content">
                    <div className="media-sub-content"  >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7262 5.38462C11.9431 5.60157 11.9431 5.95333 11.7262 6.17029L7.28172 10.6147C7.06476 10.8317 6.713 10.8317 6.49605 10.6147L4.27382 8.39251C4.05687 8.17555 4.05687 7.8238 4.27382 7.60684C4.49078 7.38988 4.84254 7.38988 5.0595 7.60684L6.88888 9.43622L10.9405 5.38462C11.1574 5.16766 11.5092 5.16766 11.7262 5.38462Z" fill="#61616B" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.44412C4.93175 2.44412 2.44444 4.93143 2.44444 7.99967C2.44444 11.0679 4.93175 13.5552 8 13.5552C11.0682 13.5552 13.5555 11.0679 13.5555 7.99967C13.5555 4.93143 11.0682 2.44412 8 2.44412ZM1.33333 7.99967C1.33333 4.31778 4.3181 1.33301 8 1.33301C11.6819 1.33301 14.6667 4.31778 14.6667 7.99967C14.6667 11.6816 11.6819 14.6663 8 14.6663C4.3181 14.6663 1.33333 11.6816 1.33333 7.99967Z" fill="#61616B" />
                        </svg>
                    </div>
                    <div className="title-sub-content">{`Graphic design ${i}`}</div>
                </div>)}
            </div>
            <button type='button' className="btn-seemore" onClick={() => { }} >
                <div className="button2">See more</div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.04222 3.27596C6.86471 3.09845 6.86471 2.81064 7.04222 2.63313C7.21974 2.45562 7.50754 2.45562 7.68505 2.63313L10.8665 5.81461L10.8698 5.81793C10.9503 5.89994 11 6.01235 11 6.13636C11 6.198 10.9877 6.25676 10.9655 6.31036C10.9433 6.36397 10.9104 6.4142 10.8669 6.45778L7.68505 9.6396C7.50754 9.81711 7.21974 9.81711 7.04222 9.6396C6.86471 9.46208 6.86471 9.17428 7.04222 8.99677L9.44809 6.59091H1.45455C1.20351 6.59091 1 6.3874 1 6.13636C1 5.88533 1.20351 5.68182 1.45455 5.68182H9.44808L7.04222 3.27596Z" fill="#287CF0" />
                </svg>
            </button>
            <div className="number-card">
                {Array.from({ length: 3 }).map((e, i) =>
                    <div className="card">
                        <div className="card-infomation">
                            <div className="content1">
                                <div className="content-title-parent">
                                    <div className="content-title4">{`${e}`}</div>
                                    <div className="content-subtitle-text">Time on desgin</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="combo-action-view">
            <div className="combo">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5261 1.67395C17.9407 1.73017 18.2312 2.11184 18.175 2.52645L17.5689 6.99614C17.5128 7.4101 17.1322 7.70049 16.7181 7.64528L12.1726 7.03922C11.7579 6.98393 11.4665 6.6029 11.5218 6.18817C11.5771 5.77344 11.9582 5.48207 12.3729 5.53736L15.2903 5.92636C14.0585 4.38085 12.1438 3.40919 10 3.40919C6.25174 3.40919 3.18182 6.47911 3.18182 10.2274C3.18182 10.6458 2.84265 10.985 2.42425 10.985C2.00585 10.985 1.66667 10.6458 1.66667 10.2274C1.66667 5.64231 5.41494 1.89404 10 1.89404C12.5318 1.89404 14.8177 3.00972 16.3361 4.81209L16.6736 2.32287C16.7298 1.90826 17.1115 1.61773 17.5261 1.67395Z" fill="#61616B" />
                    <path d="M18.3333 10.2281C18.3333 9.80972 17.9941 9.47054 17.5757 9.47054C17.1573 9.47054 16.8182 9.80972 16.8182 10.2281C16.8182 13.9764 13.7482 17.0463 9.99997 17.0463C7.85595 17.0463 5.94105 16.0745 4.70926 14.5287L7.6271 14.9177C8.04182 14.973 8.42285 14.6816 8.47815 14.2669C8.53345 13.8522 8.24207 13.4712 7.82734 13.4159L3.28189 12.8098C2.86781 12.7546 2.48719 13.045 2.43106 13.4589L1.825 17.9286C1.76878 18.3432 2.05931 18.7249 2.47391 18.7811C2.88852 18.8373 3.27019 18.5468 3.32641 18.1322L3.66388 15.6433C5.18221 17.4458 7.46818 18.5615 9.99997 18.5615C14.585 18.5615 18.3333 14.8132 18.3333 10.2281Z" fill="#61616B" />
                </svg>
            </div>
            <div className="combo-button">
                <div className="button3">
                    <div className="button4">
                        <div className="button5">Button</div>
                    </div>
                </div>
                <div className="button6">
                    <div className="button4">
                        <div className="button5">Button</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}