import { ReactElement, forwardRef } from 'react';

const Component: BaseType = forwardRef(
    <Tag extends React.ElementType = 'div'>(
        { tag, children, visible = true, asChild, ...rest }: ComponentProps<Tag>,
        ref: ComponentRef<Tag>,
    ) => {
        if (!visible) {
            return <></>;
        }
        if (asChild) {
            const slot = findTag(children);
            if (!slot) {
                return <></>;
            }
            const { Tag, props } = slot;
            return <Tag ref={ref} {...rest} {...props} />;
        }
        const Tag = tag ?? 'div';
        return (
            <Tag ref={ref} {...rest}>
                {children}
            </Tag>
        );
    },
);
export default Component;

type TagProp<Tag extends React.ElementType> = {
    tag?: Tag;
    asChild?: boolean;
};

export type ComponentProps<Tag extends React.ElementType> = React.PropsWithChildren<TagProp<Tag>> &
    Omit<React.ComponentPropsWithRef<Tag>, keyof TagProp<Tag>> & {
        visible?: boolean;
    };
export type ComponentRef<Tag extends React.ElementType> = React.ComponentPropsWithRef<Tag>['ref'];
export type BaseType = <Tag extends React.ElementType = 'div'>(
    props: ComponentProps<Tag>,
    ref: ComponentRef<Tag>,
) => React.ReactNode;

const findTag = (
    children: React.ReactNode,
):
    | {
          Tag: React.ElementType;
          props: any;
      }
    | undefined => {
    if (typeof children === 'string') {
        return undefined;
    }
    if (Array.isArray(children)) {
        return children.reduce((acc, child) => {
            if (acc) {
                return acc;
            }
            return findTag(child);
        }, undefined);
    }
    if (typeof children === 'object' && children !== null) {
        return {
            Tag: (children as ReactElement).type as React.ElementType,
            props: (children as ReactElement).props,
        };
    }
    return undefined;
};
