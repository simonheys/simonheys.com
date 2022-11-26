import dynamic from 'next/dynamic';
import { ComponentProps, ComponentPropsWithoutRef, FC } from 'react';

import { Component } from '../modules/content';
import Footer from './Footer';
import Header from './Header';
import CaseStudiesNext from './case-studies/CaseStudiesNext';
// fundamental page structure is static
// this allows DOM to build, size and scroll as expected
import CaseStudiesGrid from './case-studies/grid/CaseStudiesGrid';
import Prose from './ui/Prose';
import ScrollingBrowser from './ui/ScrollingBrowser';
import ScrollingBrowserCell from './ui/ScrollingBrowserCell';
import WorkHeader from './work/WorkHeader';
import WorkNext from './work/WorkNext';
import WorkRow from './work/WorkRow';
import WorkGrid from './work/grid/WorkGrid';

// // unique components are dynamic
const MykrobeAnimation = dynamic(
  () => import('./work/mykrobe/MykrobeAnimation')
);
const MykrobeCluster = dynamic(() => import('./work/mykrobe/MykrobeCluster'));
const SPSCollection = dynamic(() => import('./work/sps/SPSCollection'));
const WordClockEditable = dynamic(
  () => import('./word-clock/WordClockEditable')
);
const WordClockCell = dynamic(() => import('./word-clock/WordClockCell'));
const WordClockFill = dynamic(() => import('./word-clock/WordClockFill'));

const MapTypeToComponent = {
  'case-studies-grid': CaseStudiesGrid,
  'case-studies-next': CaseStudiesNext,
  'mykrobe-animation': MykrobeAnimation,
  'mykrobe-cluster': MykrobeCluster,
  'scrolling-browser-cell': ScrollingBrowserCell,
  'scrolling-browser': ScrollingBrowser,
  'sps-collection': SPSCollection,
  'word-clock-cell': WordClockCell,
  'word-clock-editable': WordClockEditable,
  'word-clock-fill': WordClockFill,
  'work-grid': WorkGrid,
  'work-header': WorkHeader,
  'work-next': WorkNext,
  'work-row': WorkRow,
  footer: Footer,
  header: Header,
  prose: Prose,
};

export type ComponentKey = keyof typeof MapTypeToComponent;

export const MappedComponent: FC<Component> = ({ type, ...rest }) => {
  const Component = MapTypeToComponent[type] as any;
  if (Component) {
    return <Component {...rest} />;
  }
  return null;
};

const Components: FC<{ components: Component[] }> = ({ components }) => {
  return (
    <>
      {components.map((props, index) => {
        return <MappedComponent key={index} {...props} />;
      })}
    </>
  );
};

export default Components;
