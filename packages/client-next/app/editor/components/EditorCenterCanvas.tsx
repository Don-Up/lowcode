// packages/client-next/app/editor/components/canvas/EditorCenterCanvas.tsx
'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearComponents, swapComponent } from '@/store/componentSlice';
import SortableContainer from '@/components/DragSort/SortableContainer';
import SortableItem from '@/components/DragSort/SortableItem';
import { Component } from '@/app/editor/components/Model';
import TextComponent from '@/app/editor/components/text';
import TextProps from '@/app/editor/components/text/TextProps';
import { useOnce } from '@/hooks/useOnce';
import ImageComponent from '@/app/editor/components/image';
import SwiperComponent from '@/app/editor/components/swiper';
import SwiperProps from '@/app/editor/components/swiper/SwiperProps';
import ImageProps from '@/app/editor/components/image/ImageProps';
import CardProps from '@/app/editor/components/card/CardProps';
import CardComponent from '@/app/editor/components/card';
import ListProps from '@/app/editor/components/list/ListProps';
import ListComponent from '@/app/editor/components/list';
import SplitProps from '@/app/editor/components/split/SplitProps';
import SplitComponent from '@/app/editor/components/split';
import EmptyProps from '@/app/editor/components/empty/EmptyProps';
import EmptyComponent from '@/app/editor/components/empty';
import RichTextComponent from '@/app/editor/components/richtext';
import RichTextProps from '@/app/editor/components/richtext/RichTextProps';
import QrCodeComponent from '@/app/editor/components/qrcode';
import QrCodeProps from '@/app/editor/components/qrcode/QrCodeProps';
import AlertComponent from '@/app/editor/components/alert';
import AlertProps from '@/app/editor/components/alert/AlertProps';
import InputComponent from '@/app/editor/components/input';
import InputProps from '@/app/editor/components/input/InputProps';
import TextAreaProps from '@/app/editor/components/textarea/TextAreaProps';
import TextAreaComponent from '@/app/editor/components/textarea';
import RadioComponent from '@/app/editor/components/radio';
import RadioProps from '@/app/editor/components/radio/RadioProps';

export function getComp(comp: Component, isSelected: boolean = false) {
  const commonProps = { ...comp, isSelected }; // Pass isSelected to indicate selection
  console.log('TEMP', 'here....', commonProps.type);

  switch (comp.type) {
    case 'text':
      const textProps = commonProps as TextProps;
      return <TextComponent {...textProps} />;
    case 'image':
      const imageProps = commonProps as ImageProps;
      return <ImageComponent {...imageProps} />;
    case 'swiper':
      const swipeProps = commonProps as SwiperProps;
      return <SwiperComponent {...swipeProps} />;
    case 'card':
      const cardProps = commonProps as CardProps;
      return <CardComponent {...cardProps} />;
    case 'list':
      const listProps = commonProps as ListProps;
      return <ListComponent {...listProps} />;
    case 'split':
      return <SplitComponent {...(commonProps as SplitProps)} />;
    case 'empty':
      return <EmptyComponent {...(commonProps as EmptyProps)} />;
    case 'richtext':
      return <RichTextComponent {...(commonProps as RichTextProps)} />;
    case 'qrcode':
      return <QrCodeComponent {...(commonProps as QrCodeProps)} />;
    case 'alert':
      return <AlertComponent {...(commonProps as AlertProps)} />;
    case 'input':
      return <InputComponent {...(commonProps as InputProps)} />;
    case 'textarea':
      return <TextAreaComponent {...(commonProps as TextAreaProps)} />;
    case 'radio':
      return <RadioComponent {...(commonProps as RadioProps)} />;
  }
  return <></>;
}

export default function EditorCenterCanvas() {

  const dispatch = useAppDispatch();

  useOnce(() => {
    console.log('TEMP', 'clearComponents');
    dispatch((clearComponents()));
  });

  const { components, isPreviewMode, selectedComponentId } = useAppSelector((state) => state.component.present);

  console.log('TEMP', 'components: ' + components.length);

  function handleDragEnd(oldIndex: number, newIndex: number) {
    // Swap the component
    if (!isPreviewMode)
      dispatch(swapComponent({ oldIndex, newIndex }));
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isPreviewMode)
      e.preventDefault(); // 允许放下
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isPreviewMode) {
      e.preventDefault();

      const componentType = e.dataTransfer.getData('componentType');
      // 根据拖拽类型添加对应组件
      switch (componentType) {
        // case 'Text':
        //   // 添加到 Canvas（这里可根据鼠标位置设置 x, y）
        //   dispatch(addComponent({...TextPropCompDefaultProp, id: nanoid(8)}))
        //   break;
        // case 'Image':
        //   dispatch(addComponent({...ImagePropCompDefaultProp, id: nanoid(8)}))
        //   break;
        // case 'Button':
        //   dispatch(addComponent({...ButtonPropCompDefaultProp, id: nanoid(8)}))
        //   break;
        // case 'Input':
        //   dispatch(addComponent({...InputPropCompDefaultProp, id: nanoid(8)}))
        //   break;
        // case 'Card':
        //   dispatch(addComponent({...CardPropCompDefaultProp, id: nanoid(8)}))
        //   break;
        // case "Container":
        //   dispatch(addComponent({...ContainerPropCompDefaultProp, id: nanoid(8)}))
        //   break;
        default:
          return;
      }
    }
  };

  const renderNestedComponents = (comp: Component) => {
    // const isSelected = comp.id === selectedComponentId; // Check if this component is selected
    // if (comp.type === "container" && comp.children) {
    //   return (
    //     <Container {...comp} isSelected={isSelected} key={comp.id}>
    //       {(comp as ContainerPropCompProp).children}
    //     </Container>
    //   );
    // }
    return getComp(comp, true); // Pass isSelected to leaf components
  };

  return (
    <SortableContainer items={components} onDragEnd={handleDragEnd}>
      <div className="flex-2 bg-white custom-scrollbar round"
           onDragOver={handleDragOver}
           onDrop={handleDrop}>
        <div className={'flex flex-col gap-2'}>
          {components.map(comp => <div key={comp.id}>
            <SortableItem id={comp.id} key={comp.id}>
              {getComp(comp)}
              {/*{renderNestedComponents(comp)}*/}
            </SortableItem>
          </div>)}
        </div>
      </div>
    </SortableContainer>
  );
}