import React, { CSSProperties, ReactNode } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import './slider.css';
import ScaleOutAnimation from 'react-awesome-slider/src/styled/scale-out-animation.scss';
import CubeAnimation from 'react-awesome-slider/src/styled/cube-animation.scss';
import FoldOutAnimation from 'react-awesome-slider/src/styled/fold-out-animation.scss';
import FallAnimation from 'react-awesome-slider/src/styled/fall-animation.scss';
import { Winicon } from '../wini-icon/winicon';

interface CarouselProps {
    id?: string,
    children?: Array<ReactNode>,
    autoPlay?: boolean,
    /** default: 2000ms */
    duration?: number,
    className?: string,
    iconSize?: number | string,
    iconColor?: string,
    prevButton?: ReactNode,
    nextButton?: ReactNode,
    style?: CSSProperties,
    buttons?: boolean,
    onChage?: (i: number) => void,
    animation: "basic" | "scaleOut" | "cubeAnimation" | "foldOut" | "fall"
}

interface SliderState {
    page: number
}

export class Carousel extends React.Component<CarouselProps, SliderState> {
    private intervalPlay: any
    constructor(props: CarouselProps) {
        super(props)
        props.buttons ??= true
        this.state = {
            page: 0
        }
        this.autoPlay = this.autoPlay.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
    }

    nextPage = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && (index + 1) < this.props.children.length) {
            this.setState({ page: index + 1 })
            if (this.props.onChage) this.props.onChage(index + 1)
        }
    }

    previousPage = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && index > 0) {
            this.setState({ page: index - 1 })
            if (this.props.onChage) this.props.onChage(index - 1)
        }
    }

    private autoPlay = () => {
        let index = this.state?.page ?? 0;
        if (this.props?.children && (index + 1) === this.props.children.length)
            index = -1
        this.setState({ page: index + 1 })
        if (this.props.onChage) this.props.onChage(index + 1)
    }

    componentDidMount(): void {
        if (this.props.autoPlay) this.intervalPlay = setInterval(this.autoPlay, this.props.duration ?? 2000)
    }

    componentDidUpdate(prevProps: Readonly<CarouselProps>, prevState: Readonly<SliderState>): void {
        if (this.props.autoPlay !== prevProps.autoPlay && !this.props.autoPlay) clearInterval(this.intervalPlay)
    }

    render() {
        let animation = undefined
        switch (this.props.animation) {
            case "scaleOut":
                animation = ScaleOutAnimation
                break;
            case "cubeAnimation":
                animation = CubeAnimation
            case "foldOut":
                animation = FoldOutAnimation
            case "fall":
                animation = FallAnimation
                break;
            default:
                break;
        }
        return <AwesomeSlider
            style={this.props.style}
            cssModule={animation}
            className={`custom-slider-container ${this.props.className ?? ''}`}
            selected={this.state.page}
            bullets={false}
            buttons={this.props.buttons ? (this.props.children && this.props.children?.length > 1) : false}
            organicArrows={false}
            buttonContentLeft={this.props.prevButton ?? <Winicon src={"fill/arrows/circle-ctrl-left"} size={"2.4rem"} color={this.props.iconColor ?? "var(--neutral-absolute-background-color)"} />}
            buttonContentRight={this.props.nextButton ?? <Winicon src={"fill/arrows/circle-ctrl-right"} size={"2.4rem"} color={this.props.iconColor ?? "var(--neutral-absolute-background-color)"} />}
        >
            {this.props.children}
        </AwesomeSlider>
    }
}