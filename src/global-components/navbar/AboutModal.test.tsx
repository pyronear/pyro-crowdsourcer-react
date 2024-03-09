import { render, screen } from '@testing-library/react'

import { AboutModal } from './AboutModal'

it('It should mount the about modal', () => {
  const { container } = render(
    < AboutModal close={() => {}} context={{}}/>
  )

  expect(screen.getByText('A propos de pyronear')).toBeVisible()
  expect(screen.getByText('Pyronear est une association à but non lucratif loi 1901 dont l’objectif est de démocratiser des solutions technologiques sobres et ouvertes de lutte contre les incendies de forêts, au service des écosystèmes et des citoyens. Pour cela, nous co-construisons une solution open source de détection détection précoce, performante, automatique, énergiquement sobre, économique et modulable des départs de feux dans les espaces naturels.')).toBeVisible()

  expect(container).toMatchSnapshot()
})
