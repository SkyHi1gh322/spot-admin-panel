export type BaseBuilderProps = {
    title: string,

}

export type BaseBuilderCloseFn = {
    onClose: () => void
}

export type BuilderFullProps = BaseBuilderProps & BaseBuilderCloseFn