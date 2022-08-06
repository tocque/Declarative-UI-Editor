interface PropValue {
    type: string;
    name: string;
    desc: string;
    init: string;
};

type RenderBlock = (context: Block, oldElm?: HTMLElement) => HTMLElement;

export interface BlockMeta {
    type: BlockType;
    title: string;
    props: Record<string, PropValue>;
    initSize: [ number, number ];
    initStyle: string;
    render: RenderBlock;
}

export interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    meta: BlockMeta;
    props: Record<string, string>;
    style: string;
    condition?: string;
    onClick?: string;
    onHover?: string;
    id: number;
}

let id = 0;

export const createBlock = (type: BlockType): Block => {
    const meta = BlockRegisty.get(type);
    if (!meta) {
        throw Error();
    }
    const props = Object.fromEntries(
        Object
            .entries(meta.props)
            .map(([ key, value ]) => [ key, value.init ?? '' ])
    );
    const [ width, height ] = meta.initSize;
    return {
        x: 5, y: 5,
        width, height,
        meta,
        props,
        style: meta.initStyle,
        id: id++,
    }
}

export enum BlockType {
    TEXT = 'text',
    RECT = 'rect',
}

const BlockRegisty = new Map<BlockType, BlockMeta>();

interface BlockRegisterOption {
    title: string,
    props?: Record<string, PropValue>;
    initSize: [ number, number ];
    initStyle?: string;
    render: RenderBlock;
}

const register = (type: BlockType, options: BlockRegisterOption) => {
    BlockRegisty.set(type, {
        type,
        props: {},
        initStyle: '',
        ...options,
    });
};

const setRootElement = (elm: HTMLElement, context: Block) => {
    const { x, y, width, height, onClick, onHover } = context;
    elm.style.position = "absolute";
    elm.style.left = x + 'px';
    elm.style.top = y + 'px';
    elm.style.width = width + 'px';
    elm.style.height = height + 'px';
    if (onClick) {
        elm.onclick = () => {
            eval(onClick);
        }
    }
}

register(BlockType.TEXT, {
    title: "文本",
    initSize: [ 100, 20 ],
    props: {
        text: {
            type: 'textarea',
            name: '内容',
            desc: '文本的内容',
            init: '这是一段文本',
        },
        color: {
            type: 'color',
            name: '文本颜色',
            desc: '文本的颜色',
            init: '#000000',
        },
    },
    render: (context, oldElm) => {
        const span = (oldElm ?? document.createElement("span")) as HTMLSpanElement;
        setRootElement(span, context);
        const { props } = context;
        span.textContent = props.text;
        span.style.color = props.color;
        span.style.wordBreak = 'break-all';
        return span;
    }
});

register(BlockType.RECT, {
    title: "矩形",
    initSize: [ 50, 50 ],
    props: {
        color: {
            type: 'color',
            name: '矩形颜色',
            desc: '矩形的颜色',
            init: '#000000',
        },
    },
    render: (context, oldElm) => {
        const div = oldElm ?? document.createElement("div");
        setRootElement(div, context);
        const { props } = context;
        div.style.backgroundColor = props.color;
        return div;
    }
});

export const blockTypeList = Array.from(BlockRegisty.values())
    .map(({ type, title }) => {
        return  { type, title }
    });
