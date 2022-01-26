import { Mermaid } from "../../common/components/Mermaid/Mermaid"


export const Home = () => {
  return (
    <div>
      <Mermaid>
        {
          `graph LR %% bb.a*.*b*b*
            1[b]-->2[b]-->3[.]-->4[a]-->4[a]
		        -->5[.]-->5[.]-->6[b]-->6[b]-->7[b]-->7[b]`
        }
      </Mermaid>
    </div>
  )
}