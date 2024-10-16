import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { aboutContents } from './about.info'

const About = () => {
  return (
    <>
      {aboutContents.map((content) => {
        return (
          <>
            <div className="flex justify-between pb-2 text-xl">
              {content.title}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {content.items.map((item) => {
                return (
                  <Card key={item.title}>
                    <CardHeader className="flex flex-row gap-2 items-center justify-center p-4">
                      <img src={item.image} alt={item.title} width={50} />
                      <CardTitle className="text-xl font-medium">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )
      })}
    </>
  )
}

export default About
