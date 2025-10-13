"use client"

import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Textarea } from "@/components/ui/textarea"
import { useTextAnalysis } from "@/hooks/useTextAnalysis"

export default function Page() {
  const {
    text,
    onChangeText,
    charCount,
    spaceCount,
    noLineBreaks,
    reversed,
    htmlEntities,
    escaped,
    unicodeEscaped,
    alphabetCount,
    digitCount,
    hiraganaCount,
    katakanaCount,
    kanjiCount,
    symbolCount,
    lineCount,
    wordCount,
  } = useTextAnalysis()

  return (
    <SimpleTemplate title='Text Tips'>
      <div className='mx-4'>
        <p className='pb-2 font-bold'>Raw Text</p>

        <Textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder='Enter your text here...'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Statistics</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 text-sm'>
          <p>Characters: {charCount}</p>
          <p>Spaces: {spaceCount}</p>
          <p>Lines: {lineCount}</p>
          <p>Words: {wordCount}</p>
          <p>Alphabet: {alphabetCount}</p>
          <p>Digits: {digitCount}</p>
          <p>Hiragana: {hiraganaCount}</p>
          <p>Katakana: {katakanaCount}</p>
          <p>Kanji: {kanjiCount}</p>
          <p>Symbols: {symbolCount}</p>
        </div>
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Text without Line Breaks</p>

        <Textarea
          value={noLineBreaks}
          readOnly
          placeholder='text without line breaks will appear here'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Reversed Text</p>

        <Textarea
          value={reversed}
          readOnly
          placeholder='reversed text will appear here'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>HTML Entities</p>

        <Textarea
          value={htmlEntities}
          readOnly
          placeholder='HTML entities will appear here'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Escaped Text</p>

        <Textarea
          value={escaped}
          readOnly
          placeholder='escaped text will appear here'
          rows={5}
        />
      </div>

      <div className='mx-4 mt-4'>
        <p className='pb-2 font-bold'>Unicode Escaped</p>

        <Textarea
          value={unicodeEscaped}
          readOnly
          placeholder='unicode escaped text will appear here'
          rows={5}
        />
      </div>
    </SimpleTemplate>
  )
}
