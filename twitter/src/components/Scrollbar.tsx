//@ts-nocheck
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import ReactScrollbarsCustom, { ScrollbarProps } from "react-scrollbars-custom";

// не получилось взять ScrollbarThumbProps и ScrollbarTrackProps из либы
interface Props extends ScrollbarProps {
  thumbProps?: any;
  trackProps?: any;
  giveRefScroll?: (e: any) => void;
  PermanderTrackY?: boolean;
  minimalThumbYSize?: number;
}

const Scrollbar: FC<PropsWithChildren<Props>> = ({
  children,
  thumbProps = {
    renderer: ({ elementRef, style, ...restProps }) => (
      <div
        {...restProps}
        ref={elementRef}
        style={{
          ...style,
          background: "rgba(146, 156, 166, 0.4)",
        }}
      />
    ),
  },
  thumbXProps = thumbProps,
  thumbYProps = thumbProps,
  trackProps,
  trackXProps = trackProps,
  trackYProps = trackProps,
  giveRefScroll,
  ...props
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isShow = isScrolling || isMouseOver;

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const hidingTrackProps = useMemo(
    () => ({
      renderer: ({ elementRef, style, ...restProps }) => (
        <span
          {...restProps}
          ref={elementRef}
          style={{
            ...style,
            opacity: isShow ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
            zIndex: 99,
            background: "transparent",
          }}
        />
      ),
    }),
    [isShow]
  );

  return (
    // @ts-ignore
    <ReactScrollbarsCustom
      {...props}
      ref={(e) => {
        giveRefScroll?.call(null, e);
        return e;
      }}
      wrapperProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div {...restProps} ref={elementRef} style={{ ...style, right: 0 }} />
        ),
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      trackXProps={trackXProps || hidingTrackProps}
      trackYProps={trackYProps || hidingTrackProps}
      thumbXProps={thumbXProps}
      thumbYProps={thumbYProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      scrollDetectionThreshold={500} // ms
    >
      {children}
    </ReactScrollbarsCustom>
  );
};

export default Scrollbar;
