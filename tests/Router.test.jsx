import { render, screen, act } from '@testing-library/react'
import { expect, test, describe, beforeEach, vi } from 'vitest'
import { Router } from '../src/Router'
import React from 'react'

// Mock App and Prompts components to avoid rendering the whole application
vi.mock('../src/App', () => ({
  default: ({ navigate }) => (
    <div>
      <div data-testid="app-component">App Component</div>
      <button onClick={() => navigate('/prompts')}>Go to Prompts</button>
    </div>
  )
}))

vi.mock('../src/Prompts', () => ({
  default: ({ navigate }) => (
    <div>
      <div data-testid="prompts-component">Prompts Component</div>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  )
}))

describe('Router', () => {
  beforeEach(() => {
    // Reset location before each test
    window.history.pushState({}, '', '/')
  })

  test('renders App component by default', () => {
    render(<Router />)
    expect(screen.getByTestId('app-component')).toBeInTheDocument()
  })

  test('renders Prompts component when path contains prompts', () => {
    window.history.pushState({}, '', '/prompts')
    render(<Router />)
    expect(screen.getByTestId('prompts-component')).toBeInTheDocument()
  })

  test('navigates from Home to Prompts', async () => {
    render(<Router />)
    const button = screen.getByText('Go to Prompts')

    await act(async () => {
      button.click()
    })

    expect(screen.getByTestId('prompts-component')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/prompts')
  })

  test('navigates from Prompts to Home', async () => {
    window.history.pushState({}, '', '/prompts')
    render(<Router />)
    const button = screen.getByText('Go to Home')

    await act(async () => {
      button.click()
    })

    expect(screen.getByTestId('app-component')).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
  })

  test('responds to popstate events', async () => {
    render(<Router />)
    expect(screen.getByTestId('app-component')).toBeInTheDocument()

    await act(async () => {
      window.history.pushState({}, '', '/prompts')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })

    expect(screen.getByTestId('prompts-component')).toBeInTheDocument()
  })
})
