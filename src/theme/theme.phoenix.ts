import { BaseTheme, ThemeTypes } from "@kanvas/phoenix";

export const customTheme: ThemeTypes = {
    ...BaseTheme,
    textInput: {
        container: 'flex flex-col gap-[6px] font-normal text-caption-md',
        label: 'text-white ml-1',
        input:
          'block w-full h-9 rounded-md border text-body-md bg-background-100 border-[#374151] disabled:cursor-not-allowed  p-2 text-white placeholder:text-white',
        error: 'border-red-500 text-base-red-100 text-body-sm',
      },
}