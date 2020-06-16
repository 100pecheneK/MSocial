import React from 'react'


export default function withSuspense(Component) {
  return (props) => (
    <React.Suspense fallback={<p>Loading component...</p>}>
      <Component {...props} />
    </React.Suspense>
  )
}
