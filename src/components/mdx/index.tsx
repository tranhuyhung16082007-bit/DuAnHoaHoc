import { WarningBox } from "./WarningBox";
import { TipBox } from "./TipBox";
import { StepList, Step } from "./StepList";
import React from "react";

// Register custom components for MDXRemote
export const mdxComponents = {
  WarningBox,
  TipBox,
  StepList,
  Step,
  // Add base HTML overrides here if needed
  h2: (props: any) => <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4" {...props} />,
};
