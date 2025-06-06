import React from "react"
import { createFileRoute } from '@tanstack/react-router'
import Uj3Component from '../../uj3-component'

export const Route = createFileRoute('/uj3/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Uj3Component name="World!" />
    </div>
  )
}
