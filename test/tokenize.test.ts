import { describe, expect, it } from 'vitest'
import TokenizeFeatures from '../src/index'

describe('tokenize', () => {
  it('should tokenize a=1,b=2', () => {
    const tokenized = new TokenizeFeatures('a=1,b=2')

    expect(tokenized.get('a')).toEqual('1')
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a,b=2', () => {
    const tokenized = new TokenizeFeatures('a,b=2')

    expect(tokenized.get('a')).toEqual('')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a,,b=2', () => {
    const tokenized = new TokenizeFeatures('a,,b=2')

    expect(tokenized.get('a')).toEqual('')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a==1,b=2', () => {
    const tokenized = new TokenizeFeatures('a==1,b=2')

    expect(tokenized.get('a')).toEqual('1')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a\t=1,b=2', () => {
    const tokenized = new TokenizeFeatures('a\t=1,b=2')

    expect(tokenized.get('a')).toEqual('1')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a=\n1,b=2', () => {
    const tokenized = new TokenizeFeatures('a\t=1,b=2')

    expect(tokenized.get('a')).toEqual('1')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a  b', () => {
    const tokenized = new TokenizeFeatures('a  b')

    expect(tokenized.get('a')).toEqual('')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('')
  })

  it('should tokenize a  b=2', () => {
    const tokenized = new TokenizeFeatures('a  b=2')

    expect(tokenized.get('a')).toEqual('')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a=1 b=2', () => {
    const tokenized = new TokenizeFeatures('a=1 b=2')

    expect(tokenized.get('a')).toEqual('1')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('2')
  })

  it('should tokenize a=yes,b=abcd,c=1,d=0,e=true', () => {
    const tokenized = new TokenizeFeatures('a=yes,b=abcd,c=1,d=0,e=true')

    expect(tokenized.get('a')).toEqual('yes')
    expect(tokenized.isSet('a')).toEqual(true)
    expect(tokenized.get('b')).toEqual('abcd')
    expect(tokenized.isSet('b')).toEqual(false)
    expect(tokenized.isSet('c')).toEqual(true)
    expect(tokenized.isSet('d')).toEqual(false)
    expect(tokenized.isSet('e')).toEqual(true)
  })

  it('should tokenize screenx=1,screeny=2,innerwidth=3,innerheight=4', () => {
    const tokenized = new TokenizeFeatures('screenx=1,screeny=2,innerwidth=3,innerheight=4')

    expect(tokenized.get('left')).toEqual('1')
    expect(tokenized.isSet('left')).toEqual(true)
    expect(tokenized.isSet('screenx')).toEqual(false)
    expect(tokenized.get('top')).toEqual('2')
    expect(tokenized.isSet('top')).toEqual(true)
    expect(tokenized.isSet('screeny')).toEqual(false)
    expect(tokenized.get('width')).toEqual('3')
    expect(tokenized.isSet('width')).toEqual(true)
    expect(tokenized.isSet('innerwidth')).toEqual(false)
    expect(tokenized.get('height')).toEqual('4')
    expect(tokenized.isSet('height')).toEqual(true)
    expect(tokenized.isSet('innerheight')).toEqual(false)
  })
})
