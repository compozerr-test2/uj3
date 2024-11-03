import React from "react"
import { createFileRoute } from '@tanstack/react-router'
import TemplateComponent from '../../template-component'

export const Route = createFileRoute('/template/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <TemplateComponent name="World!" />
    </div>
  )
}
