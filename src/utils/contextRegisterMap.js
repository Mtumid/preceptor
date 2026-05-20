/*
 * Maps each social context to the registers that fit it naturally.
 * familier_oral is treated as familier throughout.
 */

export const CONTEXTS = [
  'Texting a close friend',
  'Job interview',
  'Formal letter',
  'Chatting with colleagues at the coffee machine',
  'Speech at a wedding',
  'Reading a 19th century novel',
]

export const contextRegisterMap = {
  'Texting a close friend':                          ['argotique', 'familier'],
  'Job interview':                                   ['courant', 'soutenu'],
  'Formal letter':                                   ['soutenu', 'littéraire'],
  'Chatting with colleagues at the coffee machine':  ['familier', 'courant'],
  'Speech at a wedding':                             ['courant', 'soutenu'],
  'Reading a 19th century novel':                    ['soutenu', 'littéraire'],
}
